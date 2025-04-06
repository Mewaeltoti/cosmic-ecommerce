import { SingleProduct } from "@/cosmic/blocks/ecommerce/SingleProduct";

type Props = {
  params: { slug: string };
  searchParams: { success?: string };
};

export default async function SingleProductPage({ params, searchParams }: Props) {
  return (
    <SingleProduct
      query={{ slug: params.slug, type: "products" }}
      purchased={!!searchParams.success}
    />
  );
}
