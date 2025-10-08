import Image from 'next/image';

const shimmer =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxNiAxNic+PHJlY3Qgd2lkdGg9JzE2JyBoZWlnaHQ9JzE2JyBmaWxsPScjZTBlN2ZmJyAvPjxjaXJjbGUgY3g9JzgnIGN5PSc2JyByPSczJyBmaWxsPScjOTRhM2I4JyAvPjxyZWN0IHg9JzMnIHk9JzExJyB3aWR0aD0nMTAnIGhlaWdodD0nNCcgcng9JzInIGZpbGw9JyM5NGEzYjgnIC8+PC9zdmc+';
const blurSvg = Buffer.from(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><rect width='16' height='16' fill='%23e0e7ff' /><circle cx='8' cy='6' r='3' fill='%2394a3b8' /><rect x='3' y='11' width='10' height='4' rx='2' fill='%2394a3b8' /></svg>`
).toString('base64');

const Avatar = () => {
  return (
    <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-background shadow-xl ring-2 ring-accent/40">
      <Image
        src="/images/avatar.svg"
        alt="[YOUR_NAME] portrait"
        width={224}
        height={224}
        className="h-full w-full object-cover"
        priority
        placeholder="blur"
        blurDataURL={shimmer}
        blurDataURL={`data:image/svg+xml;base64,${blurSvg}`}
        sizes="(max-width: 768px) 7rem, 7rem"
      />
    </div>
  );
};

export default Avatar;
