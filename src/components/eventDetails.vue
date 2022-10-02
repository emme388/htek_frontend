<template>
<div>Details</div>
</template>

<script>


export default {

    async created () {
    const queryuuid = this.$route.query.uuid
    const queryYearMonth = this.$route.query.yearMonth

    const response = await fetch("https://a61zy252h4.execute-api.eu-north-1.amazonaws.com/dev/getEvent"
      + "?date=" + queryYearMonth + "&uuid=" + queryuuid)
    this.event = await response.json();
    console.log(this.event);
  },

  name: 'eventDetails',
  data: () => ({
    uuid: "",
    monthYear: "",
    event: {}
    
  }),

}
</script>
