import Image from "next/image";

export default function Brands() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-gray-700  uppercase tracking-wider text-1xl font-bold">
          Trusted by teams worldwide
        </p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-30  items-center">
          <Image src="/slack.png" width={100} height={40} alt="Slack" />
          <Image src="/spotify.png" width={100} height={40} alt="Spotify" />
          <Image src="/airbnb.jfif" width={100} height={40} alt="Airbnb" />
          <Image src="/strip.png" width={100} height={40} alt="Stripe" />
          <Image src="/zoom.png" width={100} height={40} alt="Zoom" />
        </div>
      </div>
    </section>
  );
}
