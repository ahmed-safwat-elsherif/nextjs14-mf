import MuiProviders from "@/providers/MuiProviders";
import { Button, Stack } from "@mui/material";
import { type i18n } from "i18next";
import { type NextRouter } from "next/router";

type Props = Partial<{
  details?: string;
  id?: string;
  locale?: string;
  i18n: i18n;
  router: NextRouter;
}>;
const Test = (props: Props) => {
  const { i18n, router } = props;
  const { pathname, asPath, query } = router || ({} as NextRouter);

  return (
    <div>
      <p>
        Translated <strong> &quot;Hello&quot;</strong>: {i18n?.t("hello")}
      </p>
      <h4>Todos</h4>
      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={() => router?.push("/todo/1")}>
          Todo 1
        </Button>
        <Button variant="contained" onClick={() => router?.push("/todo/2")}>
          Todo 2
        </Button>
      </Stack>
      <h4>Translation</h4>
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          onClick={() =>
            router?.push({ pathname, query }, asPath, { locale: "en" })
          }
        >
          EN
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            router?.push({ pathname, query }, asPath, { locale: "fr" })
          }
        >
          FR
        </Button>
      </Stack>
      <p>
        Test changed ss {props.id} - {props.details}
      </p>
    </div>
  );
};

const WidgetWrapper = (props: React.ComponentProps<typeof Test>) => (
  <MuiProviders>
    <Test {...props} />
  </MuiProviders>
);

export default WidgetWrapper;
