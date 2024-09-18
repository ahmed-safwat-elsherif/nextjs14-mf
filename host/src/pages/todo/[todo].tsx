import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import dynamic from "next/dynamic";
import React from "react";
import { i18n as i18nConfig } from "../../../next-i18next.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { type i18n } from "i18next";
import { useRouter, type NextRouter } from "next/router";

type TestProps = {
  details?: string;
  id?: string;
  locale?: string;
  i18n: i18n;
  router: NextRouter;
};
const Test: React.ComponentType<TestProps> = dynamic(
  () => import("remote/Test"),
  {
    loading: () => <div>loading ...</div>,
  }
);

const Todo = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { details, params = { todo: "test" }, locale } = props;
  const { i18n } = useTranslation("common");
  const router = useRouter();
  return (
    <div>
      <h1>Todo Page</h1>
      <h2> Current locale: {locale}</h2>
      <Test
        router={router}
        details={details}
        id={params.todo as string}
        locale={locale}
        i18n={i18n}
      />
    </div>
  );
};

export default Todo;

const pagesParams = [
  {
    params: { todo: "1" },
  },
  {
    params: { todo: "2" },
  },
];

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = i18nConfig.locales.reduce((acc, locale) => {
    pagesParams.forEach(({ params }) => {
      acc.push({
        locale,
        params,
      });
    });
    return acc;
  }, [] as { params: { todo: string }; locale: string }[]);
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params, locale } = context;
  const i18nProps = await serverSideTranslations(locale as string, ["common"]);

  return {
    props: {
      ...i18nProps,
      details: "Test",
      params,
      locale,
    },
  };
};
