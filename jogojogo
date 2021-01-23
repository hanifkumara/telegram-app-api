<template>
  <div class="profile">
    <div class="container">
      <div class="row mb-3">
        <h2 class="title mb-4">User Profile</h2>
        <div class="col-md-3">
          <div class="card-photo">
            <label for="file-upload">
              <div class="photo-wrap">
                <img :src="getUser.avatar" alt="Coba">
              </div>
            </label>
            <input id="file-upload" type="file" @change="updateImage"/>
            <h2 class="text-center">{{getUser.displayName}}</h2>
            <p>{{getUser.email}}</p>
          </div>
        </div>
        <div class="col-md-9">
          <div class="card-contact">
            <h2>Contacts</h2>
            <div class="d-flex justify-content-between mt-4">
              <div class="card-contact-left">
                <div class="form-contact">
                  <Input name="email" label="Email Address" v-on:input="email = $event.target.value" :value="getUser.email" formStyle="underlined"/>
                </div>
                <div class="form-delivery mt-3">
                  <Input name="delivery" label="Delivery Address" v-on:input="deliveryAddress = $event.target.value" :value="getUser.deliveryAddress"  formStyle="underlined"/>
                </div>
              </div>
              <div class="card-contact-right">
                <div class="form-number">
                  <Input name="number" label="Mobile Number" v-on:input="mobileNumber = $event.target.value" :value="getUser.mobileNumber" formStyle="underlined"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-8">
          <div class="card-details">
            <h2 class="mb-3">Details</h2>
            <div class="form-display-name">
              <Input name="name" label="Display Name" v-on:input="displayName = $event.target.value" :value="getUser.displayName" formStyle="underlined"/>
            </div>
            <div class="form-first-name my-3">
              <Input name="firstName" label="First name" v-on:input="firstName = $event.target.value" :value="getUser.firstName" formStyle="underlined"/>
            </div>
            <div class="form-last-name">
              <Input name="lastName" label="Last name" v-on:input="lastName = $event.target.value" :value="getUser.lastName" formStyle="underlined"/>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <h6 class="text-center text-white">Do you want to save the change?</h6>
          <div class="button-wrap" @click="handleForm">
            <Button title="Save Change" type="rectangle2"/>
          </div>
          <div class="button-wrap">
            <Button title="Cancle" type="rectangle"/>
          </div>
          <div class="button-wrap">
            <Button title="Edit Password" type="white2"/>
          </div>
          <div class="button-wrap" @click="logout">
            <Button title="Log out" type="white2"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from '../../components/_parts/Input'
import Button from '../../components/_parts/Button'
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'Profile',
  components: {
    Input,
    Button
  },
  data () {
    return {
      email: '',
      mobileNumber: '',
      deliveryAddress: '',
      displayName: '',
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    ...mapActions(['getUserById', 'updateUser']),
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
      this.$router.push({ path: '/auth/login' })
    },
    handleForm () {
      const user = {
        email: this.email || this.getUser.email,
        mobileNumber: this.mobileNumber || this.getUser.mobileNumber,
        deliveryAddress: this.deliveryAddress || this.getUser.deliveryAddress,
        displayName: this.displayName || this.getUser.displayName,
        firstName: this.firstName || this.getUser.firstName,
        lastName: this.lastName || this.getUser.lastName
      }
      this.updateUser(user)
        .then(res => {
          Swal.fire(
            res.message,
            res.status,
            'success'
          )
        })
        .catch(err => {
          Swal.fire(
            err.message,
            err.status,
            'error'
          )
        })
    },
    async updateImage (event) {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('image', file, file.name)
      this.updateUser(formData)
        .then(res => {
          Swal.fire(
            res.message,
            res.status,
            'success'
          )
        })
        .catch(err => {
          Swal.fire(
            err.message,
            err.status,
            'error'
          )
        })
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  created () {
    this.getUserById()
  }
}
</script>

<style scoped>
.profile{
  background: url("../../assets/img/Kopi.png");
  width: 100%;
  padding: 40px 0;
}
h2.title{
  color: white;
}
.card-photo{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
}
.photo-wrap{
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
}
.photo-wrap > img {
  object-fit: cover;
  width: 100%;
  border-radius: 50%;
  height: 100%;
}
.card-contact{
  border-radius: 10px;
  background-color: white;
  padding: 20px;
  padding-bottom: 27px;
}
.card-contact-left, .card-contact-right{
  width: 47%;
}
.card-details{
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
}
.button-wrap{
  height: 43px;
}
[type="file"] {
  display: none
}
@media screen and (max-width: 767px) {
  .col-md-9{
    margin-top: 20px;
  }
  .col-md-8{
    margin-top: -20px;
  }
  .col-md-4{
    margin-top: 20px;
  }
}
</style>
