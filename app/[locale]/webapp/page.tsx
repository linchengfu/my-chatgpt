"use client";

import { useTranslations } from "next-intl";

const Webapp = ({ params }: { params: { locale: string } }) => {
  const t = useTranslations("HomePage");
  return <h1>Webapp {t("title")}</h1>;
};

export default Webapp;
