// TypeScript examples for GitHub Copilot testing
// This file demonstrates Copilot's TypeScript support and type inference

/**
 * Interface for configuration settings
 */
interface CopilotConfig {
    apiEndpoint: string;
    timeout: number;
    retries: number;
    features: string[];
    advanced?: {
        maxSuggestions: number;
        enableLogging: boolean;
        cacheResults: boolean;
    };
}

/**
 * Generic response type for API calls
 */
interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
    timestamp: Date;
}

/**
 * User data interface
 */
interface User {
    id: number;
    username: string;
    email: string;
    profile?: {
        firstName: string;
        lastName: string;
        bio: string;
    };
}

/**
 * Generic class demonstrating TypeScript features that Copilot can suggest
 */
class CopilotService<T> {
    private config: CopilotConfig;
    private cache: Map<string, T> = new Map();

    constructor(config: CopilotConfig) {
        this.config = config;
    }

    /**
     * Generic method with type constraints
     * @param key Cache key
     * @param data Data to cache
     * @returns Cached data
     */
    public cache(key: string, data: T): T {
        this.cache.set(key, data);
        return data;
    }

    /**
     * Async method with proper error handling
     * @param endpoint API endpoint
     * @returns Promise with typed response
     */
    public async fetchData<R>(endpoint: string): Promise<ApiResponse<R>> {
        try {
            const response = await fetch(`${this.config.apiEndpoint}${endpoint}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data: R = await response.json();
            
            return {
                success: true,
                data,
                timestamp: new Date()
            };
        } catch (error) {
            return {
                success: false,
                data: {} as R,
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date()
            };
        }
    }

    /**
     * Method with union types and type guards
     * @param input String or number input
     * @returns Processed value
     */
    public processInput(input: string | number): string {
        if (typeof input === 'string') {
            return input.toUpperCase();
        } else {
            return input.toString();
        }
    }

    /**
     * Method demonstrating array operations with generics
     * @param items Array of items
     * @param predicate Filter function
     * @returns Filtered array
     */
    public filterItems<U>(items: U[], predicate: (item: U) => boolean): U[] {
        return items.filter(predicate);
    }

    /**
     * Method with optional parameters and default values
     * @param data Data to transform
     * @param options Transformation options
     * @returns Transformed data
     */
    public transformData(
        data: T[], 
        options: {
            sortBy?: keyof T;
            limit?: number;
            reverse?: boolean;
        } = {}
    ): T[] {
        let result = [...data];

        if (options.sortBy) {
            result.sort((a, b) => {
                const aVal = a[options.sortBy!];
                const bVal = b[options.sortBy!];
                return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            });
        }

        if (options.reverse) {
            result.reverse();
        }

        if (options.limit) {
            result = result.slice(0, options.limit);
        }

        return result;
    }
}

/**
 * Utility functions with advanced TypeScript features
 */
namespace CopilotUtils {
    /**
     * Type-safe deep merge function
     * @param target Target object
     * @param source Source object
     * @returns Merged object
     */
    export function deepMerge<T extends object, U extends object>(
        target: T, 
        source: U
    ): T & U {
        const result = { ...target } as T & U;
        
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                const sourceVal = source[key];
                const targetVal = (result as any)[key];
                
                if (isObject(sourceVal) && isObject(targetVal)) {
                    (result as any)[key] = deepMerge(targetVal, sourceVal);
                } else {
                    (result as any)[key] = sourceVal;
                }
            }
        }
        
        return result;
    }

    /**
     * Type guard for object checking
     * @param value Value to check
     * @returns True if value is object
     */
    function isObject(value: any): value is object {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }

    /**
     * Retry function with exponential backoff
     * @param fn Function to retry
     * @param maxRetries Maximum number of retries
     * @param baseDelay Base delay in milliseconds
     * @returns Promise with function result
     */
    export async function retry<T>(
        fn: () => Promise<T>,
        maxRetries: number = 3,
        baseDelay: number = 1000
    ): Promise<T> {
        let lastError: Error;

        for (let i = 0; i <= maxRetries; i++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));
                
                if (i < maxRetries) {
                    const delay = baseDelay * Math.pow(2, i);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }

        throw lastError!;
    }

    /**
     * Debounce function with TypeScript generics
     * @param func Function to debounce
     * @param wait Wait time in milliseconds
     * @returns Debounced function
     */
    export function debounce<T extends (...args: any[]) => any>(
        func: T,
        wait: number
    ): (...args: Parameters<T>) => void {
        let timeout: NodeJS.Timeout | null = null;
        
        return (...args: Parameters<T>) => {
            if (timeout) {
                clearTimeout(timeout);
            }
            
            timeout = setTimeout(() => {
                func(...args);
            }, wait);
        };
    }
}

// Example usage demonstrating TypeScript features
const config: CopilotConfig = {
    apiEndpoint: 'https://api.github.com',
    timeout: 30000,
    retries: 3,
    features: ['completion', 'suggestion', 'documentation'],
    advanced: {
        maxSuggestions: 10,
        enableLogging: true,
        cacheResults: true
    }
};

const userService = new CopilotService<User>(config);

// Example of type-safe usage
async function exampleUsage(): Promise<void> {
    try {
        const userResponse = await userService.fetchData<User>('/user/123');
        
        if (userResponse.success) {
            console.log('User data:', userResponse.data.username);
            userService.cache('user-123', userResponse.data);
        } else {
            console.error('Error:', userResponse.error);
        }

        const processedInput = userService.processInput('hello world');
        console.log('Processed:', processedInput); // "HELLO WORLD"

        const users: User[] = [
            { id: 1, username: 'alice', email: 'alice@example.com' },
            { id: 2, username: 'bob', email: 'bob@example.com' }
        ];

        const filteredUsers = userService.filterItems(users, user => user.id > 1);
        console.log('Filtered users:', filteredUsers);

    } catch (error) {
        console.error('Usage example error:', error);
    }
}

// Export for use in other modules
export { CopilotService, CopilotUtils, CopilotConfig, ApiResponse, User };