import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import dynamic from "next/dynamic";
import React from "react";

const Test: React.ComponentType<{ details?: string; id?: string }> = dynamic(
  () => import("remote/Test"),
  {
    loading: () => <div>loading ...</div>,
  }
);

const Todo = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { details, params = { todo: "test" } } = props;
  return (
    <div>
      <h1>Todo</h1>
      <Test details={details} id={params.todo as string} />
    </div>
  );
};

export default Todo;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { todo: "1" },
      },
      {
        params: { todo: "2" },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;
  return {
    props: {
      details: "Test",
      params,
    },
  };
};
