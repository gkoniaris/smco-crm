<template>
  <div class="row">
    <div class="col-md-12">
      <full-calendar :config="config" :events="events"/>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import moment from 'moment'
import 'fullcalendar/dist/locale/el'

export default {
  name: "Calendar",
  props: ["entity", "service", "view", "height"],
  data: function() {
    return {
        config: {
            defaultView: this.view || 'listWeek',
            slotDuration: '00:15:00',
            hiddenDays: [0],
            allDaySlot: false,
            editable: false,
            height: this.height ? parseInt(this.height): "auto",
            minTime: "09:00:00",
            maxTime: "21:00:00",
            header: {
            left: 'prev,next',
            center: 'title',
            right: ''
            },
			eventRender: function(event, element) {
    		}
        },
        events: [
	    ]
    };
  },
  mounted() {
      this.get()
  },
  methods: {
      get() {
          this.service
            .get(Object.assign({},{}, {status: ['open', 'freezed']}))
                .then(({ entities, count, pages }) => {
                this.events = entities.map(visit => {
                    return visit.appointments.map(appointment => {
                        return {
                            title: visit.client.firstName + ' ' + visit.client.lastName + (this.view !== 'month' ? ' (' + visit.address.address + ') \n' + visit.type + ' ' + visit.model + ', ' + visit.failureDescription + (visit.comments ? ('\nΣχόλια: ' + visit.comments) : '') : ''),
                            start: moment.utc(appointment.date),
                            end: moment.utc(appointment.date).add(appointment.duration, 'm')
                        }
                    })
                }).flat()
            })
      }
  }
};
</script>

<style>
.fc-title, .fc-time {
  font-size: 14px;
}
.fc-title > span {
  font-size: 13px !important;
}
.fc-month-view .fc-title, .fc-time,
.fc-month-view  .fc-title > span{
    font-size: 10px !important;
}
.fc-month-view .fc-event, .fc-event-dot {
    padding: 3px 3px !important;
}
.fc-event, .fc-event-dot {
    background-color: #222 !important;
    color: white !important;
    font-weight: bold !important;
    border-radius: 5px !important;
    padding: 10px 10px !important;
}
</style>