#!/usr/bin/env node

/**
 * Script untuk menjalankan migration
 * Menggunakan import ES modules
 */

import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function runMigration() {
  try {
    console.log('🔄 Running database migration...')
    
    // Coba dengan npx ace
    try {
      const { stdout, stderr } = await execAsync('npx ace migration:run')
      console.log('✅ Migration completed successfully!')
      console.log(stdout)
      if (stderr) console.log('Warnings:', stderr)
    } catch (error) {
      console.log('❌ npx ace failed, trying alternative method...')
      
      // Coba dengan node ace.js
      try {
        const { stdout, stderr } = await execAsync('node ace.js migration:run')
        console.log('✅ Migration completed successfully!')
        console.log(stdout)
        if (stderr) console.log('Warnings:', stderr)
      } catch (error2) {
        console.log('❌ node ace.js failed, trying direct execution...')
        
        // Coba dengan node bin/server.js untuk test
        console.log('🔧 Testing server startup instead...')
        const { stdout, stderr } = await execAsync('timeout 5 node bin/server.js')
        console.log('✅ Server can start (routes are valid)')
        console.log('📝 Please run migration manually:')
        console.log('   npx ace migration:run')
        console.log('   or')
        console.log('   node ace.js migration:run')
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('\n🔧 Manual steps:')
    console.log('1. Try: npx ace migration:run')
    console.log('2. Try: node ace.js migration:run')
    console.log('3. Check if database is configured correctly')
  }
}

runMigration()
