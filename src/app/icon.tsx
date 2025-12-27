import { ImageResponse } from 'next/og'

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
          fontSize: 20,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D4AF37', // VK Gold
          borderRadius: '50%',
          border: '2px solid #D4AF37', // Gold Border
          fontWeight: 800,
          fontFamily: 'sans-serif',
        }}
      >
        18
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}