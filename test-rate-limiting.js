/**
 * Test script to demonstrate rate limiting functionality
 */

const { login } = require('./login');

async function testRateLimiting() {
    console.log('🔒 Testing Rate Limiting Functionality\n');
    
    const email = 'test@example.com';
    const wrongPassword = 'wrongpassword';
    
    console.log('Attempting 6 rapid login attempts with wrong password...\n');
    
    for (let i = 1; i <= 6; i++) {
        console.log(`Attempt ${i}:`);
        
        const result = await login(email, wrongPassword, { skipNetworkSim: true });
        
        if (result.success) {
            console.log('✅ Login successful');
        } else {
            console.log(`❌ ${result.error.type}: ${result.error.message}`);
            
            if (result.error.code === 'RATE_LIMIT_ERROR') {
                console.log('🚫 Rate limiting is working correctly!');
                break;
            }
        }
        
        console.log('');
        
        // Small delay between attempts
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('Rate limiting test completed.');
}

if (require.main === module) {
    testRateLimiting().catch(console.error);
}