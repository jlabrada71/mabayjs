import axios from 'axios';

export default class CustomerRepositoryProxy {
  static async findAll() {
    try {
      const url = `${process.env.VUE_APP_API_SERVER}/api/v1/customers`;
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      alert(e);
    }
    return [];
  }

  static async delete(customer) {
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/customers/${ customer._id}`;
    try {
      await axios.delete(url, {
        //    headers: {
        //      Authorization: authorizationToken
        //    },
        //    data: {
        //      source: source
        //    }
      });
    } catch (e) {
      alert(e);
    }
  }

  static async add(customer) {
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/customers`;
    try {
      await axios.post(url, {
      //    headers: {
      //      Authorization: authorizationToken
      //    },
        customer,
      });
    } catch (e) {
      alert(e);
    }
  }

  static async update(customer) {
    alert(JSON.stringify(customer));
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/customers/${ customer._id}`;
    try {
      await axios.put(url, {
      //    headers: {
      //      Authorization: authorizationToken
      //    },
        customer,
      });
    } catch (e) {
      alert(e);
    }
  }
}

