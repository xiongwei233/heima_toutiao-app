  <template>
  <div>
    <keep-alive :exclude="[ 'LoginItem', 'searchContent', 'SearchResult', 'artileDetail']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {}
  },
  methods: {

  },
  created () {
  },
  components: {}
}
</script>

  <style lang="less" scoped></style>
