import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMenuPosts } from "@/sanity/lib/sanity";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuPosts = await getMenuPosts();
  return (
    <>
      <Header menuPosts={menuPosts} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
