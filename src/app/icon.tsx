import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 22,
          background: '#0a0604',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#bf1f1a',
          fontWeight: 900,
          borderRadius: '4px',
          fontFamily: 'sans-serif',
          border: '1px solid rgba(191,31,26,0.3)'
        }}
      >
        77
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
