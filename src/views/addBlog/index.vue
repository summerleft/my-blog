<template>
  <div id="add-blog">
    <h2>添加博客</h2>
    <form v-if="!submitted">
      <label for="">博客标题</label>
      <input type="text" v-model="blog.title" required />

      <label for="">博客内容</label>
      <textarea v-model="blog.content"></textarea>

      <label>作者:</label>
      <input type="text" v-model="blog.username" readonly>
      <button v-on:click.prevent="submitForm(blog)">添加博客</button>
    </form>

    <div v-if="submitted">
      <h3>您的博客发布成功!</h3>
    </div>

    <hr>

    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题:{{blog.title}}</p>
      <p>博客内容:</p>
      <p>{{blog.content}}</p>
      <p>作者:{{blog.username}}</p>
    </div>
  </div>
</template>

<script>
import { publish } from "../../apis/blog";

export default {
  name: 'AddBlog',
  data () {
    return {
      blog:{
        title:"",
        content:"",
        username:this.$store.state.user.username,
      },
      submitted: false
    }
  },
  methods:{
    async submitForm(value) {
      console.log(value);
      console.log(publish);
      const result = await publish(value);
      console.log(result);
      if (result.code === 200) {
        this.$message.success("发表成功");
        this.submitted = true;
      } else {
        this.$message.error("发表失败!");
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#add-blog *{
  box-sizing: border-box;
}

#add-blog {
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
