<template>
  <div class="life">
        <img class="ruby" src="@/assets/board/profil/ruby-active-low.png"/>
        <img class="ruby" src="@/assets/board/profil/ruby-active-low.png"/>
  </div>
</template>

<script>
export default {
  props: {
    player : undefined,
    hidden : false,
  },
  computed:{
    ...mapState('board',{
        life: state => state.lifes[this.player],
    }),
  },
  methods:{
    
  }
}
</script>

<style>

</style>