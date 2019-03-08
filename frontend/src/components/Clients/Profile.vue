<template>
  <div class="row mt-4">
    <div class="col-md-12">
      <h5 class="mb-4">Πληροφορίες Πελάτη</h5>
      <div class="row">
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <label class="font-weight-bold col-md-3">Όνομα:</label>
                <div class="col-md-4">{{$parent.client.firstName}}</div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="row">
                <label class="font-weight-bold col-md-3">Επώνυμο:</label>
                <div class="col-md-4">{{$parent.client.lastName}}</div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="row">
                <label class="font-weight-bold col-md-3">Email:</label>
                <a
                  class="col-md-4"
                  v-if="$parent.client.email"
                  v-bind:href="'mailto:'+$parent.client.email"
                >{{$parent.client.email}}</a>
                <div class="col-md-4" v-if="!$parent.client.email">N/A</div>
              </div>
            </div>
          </div>
          <div class="row" v-if="$parent.client.addresses && $parent.client.addresses.length">
            <div
              class="col-md-12"
              v-bind:key="address.id"
              v-for="(address, idx) in $parent.client.addresses"
            >
              <h5 class="mb-4 mt-4">Διεύθυνση {{idx + 1}}</h5>
              <div class="row">
                <div class="col-md-12">
                  <div class="row">
                    <label class="font-weight-bold col-md-3">Διεύθυνση:</label>
                    <div class="col-md-4">
                      <a
                        target="_blank"
                        v-bind:href="'https://www.google.com/maps/search/?api=1&query='+address.lat+','+address.lon"
                      >{{address.address}}</a>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="row">
                    <label class="font-weight-bold col-md-3">Περιοχή:</label>
                    <div class="col-md-4">{{address.region}}</div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="row">
                    <label class="font-weight-bold col-md-3">Πόλη:</label>
                    <div class="col-md-4">{{address.city}}</div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="row">
                    <label class="font-weight-bold col-md-3">ΤΚ:</label>
                    <div class="col-md-4">{{address.postalCode}}</div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="row">
                    <label class="font-weight-bold col-md-3">Όροφος:</label>
                    <div class="col-md-4">{{address.floor}}</div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="row">
                    <label class="font-weight-bold col-md-3">Κουδούνι:</label>
                    <div class="col-md-4">{{address.bell}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="$parent.client.phones && $parent.client.phones.length">
            <div class="col-md-12">
              <h5 class="mb-4 mt-4">Τηλέφωνα</h5>
            </div>
            <div class="col-md-12" v-bind:key="phone.id" v-for="phone in $parent.client.phones">
              <div class="row">
                  <div class="col-md-12">
                  <div class="row">
                <label class="font-weight-bold col-md-3">Τηλέφωνο ({{phone.type}}):</label>
                <div class="col-md-4">{{phone.phone}}</div>
                  </div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
