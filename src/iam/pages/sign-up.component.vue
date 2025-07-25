<script>
import {AuthenticationService} from "../services/authentication.service.js";

export default {
  name: "sign-up",
  data() {
    return {
      form: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        city: "",
        country: "",
        phone: "",
        role: null,
        dni: "",
        companyName: "",
        ruc: ""
      },
      submitted: false,
      authenticationService: new AuthenticationService(),
    };
  },
  methods: {
    submitForm() {
      this.submitted = true;

      // Validate form
      if (this.validateForm()) {
        // Call the appropriate sign-up method based on the role
        if (this.form.role === "driver") {
          this.signUpDriver(this.form);
        } else if (this.form.role === "owner") {
          this.signUpOwner(this.form);
        }
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please fill in all required fields correctly.',
          life: 3000
        });
      }
    },
    async signUpDriver(form) {
      let driverForm = {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        city: form.city,
        country: form.country,
        phone: form.phone,
        dni: form.dni
      };
      try {
        const response = await this.authenticationService.signUpDriver(driverForm);
        if (response.status === 201) {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Driver registered successfully',
            life: 3000
          });

          setTimeout(() => {
            this.$router.push("/sign-in");
          }, 4000);
          this.resetForm();
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to register driver',
            life: 3000
          });
          this.resetForm();
        }
      } catch (error) {
        console.error("Error signing up driver:", error);
      }
    },
    async signUpOwner(form) {
      let ownerForm = {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        city: form.city,
        country: form.country,
        phone: form.phone,
        companyName: form.companyName,
        ruc: form.ruc
      };
      try {
        const response = await this.authenticationService.signUpOwner(ownerForm);
        if (response.status === 201) {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Owner registered successfully',
            life: 3000
          });

          setTimeout(() => {
            this.$router.push("/sign-in");
          }, 4000);
          this.resetForm();
        }
      } catch (error) {
        console.error("Error signing up owner:", error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to register owner',
          life: 3000
        });
        this.resetForm();
      }
    },
    validateForm() {
      return (
          this.form.fullName &&
          this.form.email &&
          this.form.password &&
          this.form.confirmPassword === this.form.password &&
          (this.form.role === "driver" ? this.form.dni : true) &&
          (this.form.role === "owner" ? this.form.companyName && this.form.ruc : true)
      );
    },
    resetForm() {
      this.form = {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        city: "",
        country: "",
        phone: "",
        role: null,
        dni: "",
        companyName: "",
        ruc: ""
      };
      this.submitted = false;
    }
  }
}
</script>


<template>
  <div class="flex justify-content-center align-items-center min-h-screen">
    <div class="w-full max-w-2xl p-5 surface-card shadow-2 border-round">
      <h1 class="text-center text-2xl font-bold mb-5">{{ $t("sign-up.title") }}</h1>

      <form @submit.prevent="submitForm" class="w-full">
        <!-- Full Name & Email -->
        <div class="form grid mb-4">
          <div class="field col-12 md:col-6">
            <pv-float-label>
              <pv-input-text id="fullName" v-model="form.fullName" class="w-full"/>
              <label for="fullName">{{ $t("sign-up.name") }}</label>
            </pv-float-label>
            <small v-if="submitted && !form.fullName" class="p-error">{{ $t("sign-up.nameRequired") }}</small>
          </div>

          <div class="field col-12 md:col-6">
            <pv-float-label>
              <pv-input-text id="email" v-model="form.email" class="w-full"/>
              <label for="email">{{ $t("sign-up.email") }}</label>
            </pv-float-label>
            <small v-if="submitted && !form.email" class="p-error">{{ $t("sign-up.emailRequired") }}</small>
          </div>
        </div>

        <!-- Password & Confirm Password -->
        <div class="form grid mb-4">
          <div class="field col-12 md:col-6">
            <pv-float-label>
              <pv-password id="password" v-model="form.password" toggleMask class="w-full" inputClass="w-full"/>
              <label for="password">{{ $t("sign-up.password") }}</label>
            </pv-float-label>
            <small v-if="submitted && !form.password" class="p-error">{{ $t("sign-up.passwordRequired") }}</small>
          </div>

          <div class="field col-12 md:col-6">
            <pv-float-label>
              <pv-password id="confirmPassword" v-model="form.confirmPassword" toggleMask class="w-full" inputClass="w-full"/>
              <label for="confirmPassword">{{ $t("sign-up.confirmPassword") }}</label>
            </pv-float-label>
            <small v-if="submitted && form.confirmPassword !== form.password" class="p-error">
              {{ $t("sign-up.passwordsMatch") }}
            </small>
          </div>
        </div>

        <!-- City & Country -->
        <div class="form grid mb-4">
          <div class="field col-12 md:col-6">
            <pv-float-label>
              <pv-input-text id="city" v-model="form.city" class="w-full"/>
              <label for="city">{{ $t("sign-up.city") }}</label>
            </pv-float-label>
            <small v-if="submitted && !form.city" class="p-error">{{ $t("sign-up.cityRequired") }}</small>
          </div>

          <div class="field col-12 md:col-6">
            <pv-float-label>
              <pv-input-text id="country" v-model="form.country" class="w-full"/>
              <label for="country">{{ $t("sign-up.country") }}</label>
            </pv-float-label>
            <small v-if="submitted && !form.country" class="p-error">{{ $t("sign-up.countryRequired") }}</small>
          </div>
        </div>

        <!-- Phone -->
        <div class="field mb-4">
          <pv-float-label>
            <pv-input-text id="phone" v-model="form.phone" class="w-full" maxlength="9"/>
            <label for="phone">{{ $t("sign-up.phone") }}</label>
          </pv-float-label>
          <small v-if="submitted && !form.phone" class="p-error">{{ $t("sign-up.phoneRequired") }}</small>
        </div>

        <!-- Role -->
        <div class="field-radiobutton mb-4">
          <pv-radio-button inputId="role1" name="role" value="driver" v-model="form.role"/>
          <label for="role1" class="mr-4">{{ $t("sign-up.roleDriver") }}</label>
          <pv-radio-button inputId="role2" name="role" value="owner" v-model="form.role"/>
          <label for="role2">{{ $t("sign-up.roleOwner") }}</label>
        </div>

        <!-- Conditional Fields -->
        <div v-if="form.role === 'driver'" class="mb-4">
          <pv-float-label>
            <pv-input-text id="dni" v-model="form.dni" class="w-full" maxlength="8"/>
            <label for="dni">{{ $t("sign-up.dni") }}</label>
          </pv-float-label>
        </div>

        <div v-if="form.role === 'owner'" class="mb-4">
          <pv-float-label class="mt-5">
            <pv-input-text id="companyName" v-model="form.companyName" class="w-full"/>
            <label for="companyName">{{ $t("sign-up.companyName") }}</label>
          </pv-float-label>

          <pv-float-label class="mt-5">
            <pv-input-text id="ruc" v-model="form.ruc" class="w-full" maxlength="11"/>
            <label for="ruc">{{ $t("sign-up.RUC") }}</label>
          </pv-float-label>
        </div>

        <!-- Submit -->
        <pv-button :label="$t('sign-up.button')" type="submit" class="w-full bg-primary text-white"/>


        <p class="text-center mt-4 bg-none">
          {{ $t("sign-up.haveAccount") }}
          <router-link to="/sign-in" class="text-blue-500">{{ $t("sign-up.signInLink") }}</router-link>
        </p>

      </form>
    </div>
  </div>
  <pv-toast />
</template>


<style scoped>
.max-w-2xl {
  max-width: 42rem;
}

.p-error {
  color: #f44336;
}

.bg-none {
  background: none;
}
</style>