
<template>
    <div id="customer-list">
    <v-container class="grey lighten-5">
      <v-card
        class="mx-auto"
        max-width="400"
        tile
      >
      <v-card-title>Customers</v-card-title>
        <v-list :nav="nav">

          <v-list-item-group v-model="item" color="primary">
            <v-list-item v-for="(customer, index) in customers" :key="index">
              <v-list-item-avatar v-if="avatar">
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-row>
                  <v-col>
  <v-list-item-title v-html="entityDotPropertyName"
    v-on:click="showCustomer(customer)"></v-list-item-title>
</v-col>
<v-col>
  <v-list-item-title v-html="entityDotPropertyName"
    v-on:click="showCustomer(customer)"></v-list-item-title>
</v-col>
<v-col>
  <v-list-item-title v-html="entityDotPropertyName"
    v-on:click="showCustomer(customer)"></v-list-item-title>
</v-col>

                  <v-col>
                    <v-icon v-on:click="editCustomer(customer)">edit</v-icon>
                    <v-icon v-on:click="deleteCustomer(entityName)">delete</v-icon>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
   </v-container>
  </div>

</template>
<script>
export default {
  name: 'customer-list',
  props: {
    customers: Array,
  },
  methods: {
    deleteCustomer(customer) {
      this.$emit('delete-customer', customer);
      // alert(`deleting ${JSON.stringify(customer)}`);
    },
    editCustomer(customer) {
      this.$emit('edit-customer', customer);
      // alert(`editing ${JSON.stringify(customer)}`);
    },
    showCustomer(customer) {
      this.$emit('show-customer', customer);
      // alert(`showing ${JSON.stringify(customer)}`);
    },
  },
  data: () => ({
    valid: false,
  }),

};

</script>
<style>
c-customer-form {

}

c-customer-form__title {

}

c-customer-form-actions {

}


</style>
