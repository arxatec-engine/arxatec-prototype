import { useEffect } from "react";
import { useTitle } from "~/hooks/useTitle";
import { useGetCategoriesCase } from "../../hooks";
import { CreateCaseContent } from "../organism";
import { Loader } from "../molecules";
import { ToastManager } from "~/components/molecules/toast_manager";

export default function CreateCasePage() {
  const { changeTitle } = useTitle();
  const { data, isPending, isError } = useGetCategoriesCase();

  useEffect(() => {
    changeTitle("Crear caso - Arxatec");
  }, []);

  useEffect(() => {
    if (isError) {
      ToastManager.error(
        "Sucedió un error",
        "Al obtener las categorías de los casos sucedió un error. Por favor, inténtelo de nuevo. Si el problema persiste, contacte al administrador."
      );
      window.history.back();
    } else if (Array.isArray(data) && data.length === 0) {
      ToastManager.error(
        "No se encontró ninguna categoría de los casos",
        "No se encontró ninguna categoría de los casos. Por favor, inténtelo de nuevo. Si el problema persiste, contacte al administrador."
      );
      window.history.back();
    }
  }, [data, isError]);

  if (isPending) return <Loader />;
  return !isError && <CreateCaseContent categories={data} />;
}
