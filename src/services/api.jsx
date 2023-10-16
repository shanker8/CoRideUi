import axios from "axios";

export const CUSTOMER_BASE_REST_API_URL = 'http://localhost:9090/api';

class api{

    createNewCus(customer){
        return axios.post(CUSTOMER_BASE_REST_API_URL, customer)
    }

    getAllCustomers(){
        return axios.get(CUSTOMER_BASE_REST_API_URL)
    }

    getCustomerByMail(mail){
        return axios.get(CUSTOMER_BASE_REST_API_URL + '/' + mail);
    }

    updateCustomerByMail(mail, customer){
        return axios.put(CUSTOMER_BASE_REST_API_URL + '/' +mail, customer);
    }

    deleteCustomerMail(mail){
        return axios.delete(CUSTOMER_BASE_REST_API_URL + '/' + mail);
    }

    deleteAllCustomer(){
      return axios.delete(CUSTOMER_BASE_REST_API_URL);
  }
}

export default api;
