/**
 * Test script to demonstrate network error handling
 */

const { login } = require('./login');

async function testNetworkErrors() {
    console.log('🌐 Testing Network Error Handling\n');
    
    const email = 'user@example.com';
    const password = 'password123';
    
    console.log('Attempting multiple logins to trigger network simulation...\n');
    console.log('(Network failures occur randomly ~10% of the time)\n');
    
    let networkErrorCount = 0;
    let successCount = 0;
    const totalAttempts = 20;
    
    for (let i = 1; i <= totalAttempts; i++) {
        console.log(`Attempt ${i}:`);
        
        const result = await login(email, password, { skipRateLimit: true });
        
        if (result.success) {
            console.log('✅ Login successful');
            successCount++;
        } else {
            console.log(`❌ ${result.error.type}: ${result.error.message}`);
            
            if (result.error.code === 'NETWORK_ERROR') {
                networkErrorCount++;
                console.log('🌐 Network error simulation triggered!');
            }
        }
        
        console.log('');
        
        // Small delay between attempts
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    console.log(`\n📊 Results after ${totalAttempts} attempts:`);
    console.log(`✅ Successful logins: ${successCount}`);
    console.log(`🌐 Network errors: ${networkErrorCount}`);
    console.log(`📈 Network error rate: ${(networkErrorCount / totalAttempts * 100).toFixed(1)}%`);
    
    if (networkErrorCount > 0) {
        console.log('🎯 Network error handling is working correctly!');
    } else {
        console.log('ℹ️  No network errors occurred in this run (expected ~10% rate)');
    }
}

if (require.main === module) {
    testNetworkErrors().catch(console.error);
}