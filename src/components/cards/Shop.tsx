import placeholder from "../../assets/placeholder.jpeg";
import placeholder1 from "../../assets/placeholder1.jpeg";
import placeholder2 from "../../assets/placeholder2.jpeg";
interface ShopProps {
  name: string;
  image: number;
}

export default function Shop({ name, image }: ShopProps) {
  const images = [placeholder, placeholder1, placeholder2];
  return (
    <div className="rounded-sm bg-white p-2 pb-4 drop-shadow">
      <div className="aspect-video w-full bg-emerald-500 sm:aspect-square sm:w-[250px]">
        <img
          src={images[image]}
          alt="shop"
          className="h-full w-full object-cover"
        />
      </div>
      <p className="mt-2 font-serif text-2xl font-medium">{name}</p>
    </div>
  );
}
