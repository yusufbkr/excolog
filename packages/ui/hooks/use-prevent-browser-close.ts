import { useEffect } from "react";

/**
 * Kullanıcılara browser kapatmak, sayfayı yenileme ve tab kapatma durumlarında uyarı göstererek
 * onların yaptıkları işlerin yarım kalabileceğine ve bir statei kaybedebileceklerine dair uyarı gösteren
 * hooktur.
 */
function usePreventBrowserClose() {
  useEffect(() => {
    const handleClose = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return (event.returnValue = "Are you sure you want to close?");
    };
    window.addEventListener("beforeunload", handleClose);
    return () => {
      window.removeEventListener("beforeunload", handleClose);
    };
  }, []);
}
export default usePreventBrowserClose;
