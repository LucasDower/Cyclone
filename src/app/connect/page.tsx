import QRCode from 'react-qr-code'
import { v4 as uuidv4 } from 'uuid';

export default function Connect() {
  const id = uuidv4();

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <p>{id}</p>
      <div style={{ height: "auto", margin: "0 auto", width: "25%" }}>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={`http://192.168.0.52:3000/settings?q=${id}`}
          viewBox={`0 0 256 256`}
        />
      </div>
    </main>
  )
}
