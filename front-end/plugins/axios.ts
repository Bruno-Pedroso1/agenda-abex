import { NuxtAxiosInstance } from "@nuxtjs/axios";

export default function (
  { $axios }: { $axios: NuxtAxiosInstance },
  inject: (key: string, value: any) => void
) {
  const api = $axios.create();

  api.onRequest(() => {
    const token = localStorage.getItem("toksen") || "";
    api.setHeader("Authorization", `Bearer ${token}`);
  });

  api.onResponse((response) => response.data);

  api.setBaseURL("http://localhost:3333/");

  inject("api", api);
}
