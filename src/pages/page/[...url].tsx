import { IPageData } from "@/app";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Error from "next/error";
import { getPageByUrl } from "@/services/pagesServices";
import { useEffect, useState } from "react";

interface PageProps {
  isValidFormat: boolean;
  userId?: string;
  slug?: string;
  page?: IPageData;
}

const Page: React.FC<PageProps> = ({ isValidFormat, userId, slug, page }) => {
  // If URL format is invalid, show 404 error
  if (!isValidFormat) {
    return <Error statusCode={404} />;
  }

  const [show, setShow] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">This is a dynamic page</h1>
      <p>User ID: {userId}</p>
      <p>Slug: {slug}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get URL segments from the context
  const { url } = context.params || {};
  
  // Check if url is an array and has exactly 2 segments
  if (!Array.isArray(url) || url.length !== 2) {
    return {
      props: {
        isValidFormat: false,
      },
    };
  }

  // The url will be in the format [userId, slug]
  const [userId, slug] = url;

  // Additional validation: Check if userId is numeric
  if (!/^\d+$/.test(userId)) {
    return {
      props: {
        isValidFormat: false,
      },
    };
  }
  const fullSlug = `/${userId}/${slug}`;

  const page = await getPageByUrl(fullSlug);
  console.log("page", page);
  // If we got here, the URL format is valid
  return {
    props: {
      isValidFormat: true,
      userId,
      slug: fullSlug,
      page: page || null,
    },
  };
};

export default Page;