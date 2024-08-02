<template></template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },

  async created() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    try {
      if (code) {
        const response = await this.$api.post("/sso/codeForToken", { code });
        const token = response.access_token;
        localStorage.setItem("toksen", token);
        console.log("Token exchange successful:", response);
      }
    } catch (error) {
      console.error("Error during token exchange:", error);
      this.$toast.error(error.message);
    }
  },
};
</script>

<style></style>
