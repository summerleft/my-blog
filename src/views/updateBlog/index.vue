<template>
  <div id="update-blog">
    <h2>修改博客</h2>
    <form v-if="!submitted">
      <label for="">博客标题</label>
      <input type="text" v-model="blog.title" required />

      <label for="">博客内容</label>
      <textarea v-model="blog.content"></textarea>

      <label>作者:</label>
      <input type="text" v-model="username" readonly>
      <button v-on:click.prevent="submitForm(blog)">提交修改</button>
    </form>

    <div v-if="submitted">
      <h3>您的博客修改成功!</h3>
    </div>

    <hr>

    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题:{{blog.title}}</p>
      <p>博客内容:</p>
      <p>{{blog.content}}</p>
      <p>作者:{{username}}</p>
    </div>
  </div>
</template>

<script>
import { detail, update} from "../../apis/blog";

export default {
  name: "UpdateBlog",
  data() {
    return {
      blog: {
        title:"",
        content:"",
        id: 0,
      },
      username: this.$store.state.user.username,
      submitted: false,
    }
  },
  async created() {
    const result = await detail(this.$route.params.id);
    console.log(result);
    this.blog.title = result.data.fields.title;
    this.blog.content = result.data.fields.content;
    this.blog.id = result.data.fields.id;
  },
  methods: {
    async submitForm(value) {
      const result = await update(value);
      if (result.code === 200) {
        this.submitted = !this.submitted;
        this.$message.success("修改成功");
      } else if (result.code === 457) {
        this.$message.error("该文章不存在");
      } else {
        this.$message.error("未知错误");
      }
    }
  }
}
</script>

<style scoped>
#update-blog *{
  box-sizing: border-box;
}

#update-blog {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}

label {
  display: block;
  margin: 20px 0 10px;
}

input[type="text"],textarea,select {
  display: block;
  width: 100%;
  padding: 8px;
}

textarea {
  height: 200px;
}

#checkboxes {
  margin-top: 15px;
  display: flex;
}

#checkboxes label{
  display: inline-block;
  margin-top: 0;
}

#checkboxes input {
  flex: auto;
  display: inline-block;
  margin-top: 5px;
  margin-left: -50px;
}

button {
  float: right;
  display: block;
  margin: 20px 0;
  background: blue;
  color: #fff;
  border: 0;
  padding: 14px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}

hr {
  clear: both;
}

#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
  clear: both;
}

h3 {
  margin-top: 10px;
}
</style>