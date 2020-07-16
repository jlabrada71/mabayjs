
<template>
  <div>
  <div id="customer-form">
    <v-container>
      <v-card class="c-customer-form">
        <v-card-title class="c-customer-form__title">Customer</v-card-title>
        <v-form>
          <v-text-field label="Id" v-model="{{customer.id}}"></v-text-field>
<v-text-field label="Name" v-model="{{customer.name}}"></v-text-field>
<v-text-field label="Address" v-model="{{customer.address}}"></v-text-field>

        </v-form>
      <v-card-actions class="c-customer-form-actions">
        <v-btn class="success" @click="submit"></v-btn>
        <v-btn class="cancel" @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
   </v-container>
  </div>
</div>

</template>
<script>
export default {
  name: 'CustomerForm',
  props: {
    customer: Object,
    isUpdating: Boolean,
  },
  data: () => ({
    valid: false,
    actionText: 'Add Customer',
  }),
  watch: {
    isUpdating(updating) {
      this.actionText = updating ? 'Update Customer' : 'Add Customer';
    },
  },
  methods: {
    submit() {
      if (this.isUpdating) {
        this.$emit('update-customer', this.customer);
      } else {
        this.$emit('add-customer', this.customer);
      }
    },
    cancel() {
      this.$emit('cancel-add-customer');
    },
  },
};

</script>

c-customer-form {

}

c-customer-form__title {

}

c-customer-form-actions {

}


