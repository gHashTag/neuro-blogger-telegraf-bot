console.log('Environment check:', {
  nodeEnv: process.env.NODE_ENV,
})

export const isDev = process.env.NODE_ENV === 'development'
console.log('isDev', isDev)
