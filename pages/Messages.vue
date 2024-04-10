<template>
  <div     class="mx-auto max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl grid grid-rows-[1fr] h-[85svh] max-h-[85svh] min-h-[85svh] overflow-hidden"
>
    <div class=" md:flex no-wrap md:-mx-1">
      <!-- Messages List (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && showMessageList)"
        class="w-full md:w-4/12 md:mx-1 grid grid-rows-[[7svh]_1fr] h-[85svh] max-h-[85svh] min-h-[85svh]"
      >
        <div class="m-2">
          <h5 class="text-2xl px-4">Messages</h5>
        </div>
        <ul class="people h-77svh] max-h-[77svh] min-h-[77svh] overflow-y-auto my-auto pb-[10vh]">
          <li
            class="person"
            v-for="person in people"
            :key="person.id"
            @click="loadMessages(person)"
          >
            <img :src="person.avatar" alt="" />
            <span class="name text-lime-950 text-text-lg font-medium">{{
              person.name
            }}</span>
            <span class="time text-gray-600">{{ person.time }}</span>
            <span class="preview">{{
              person.messages.length > 0
                ? person.messages[person.messages.length - 1].text
                : ""
            }}</span>
          </li>
        </ul>
      </div>

      <!-- Message Body (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && !showMessageList)"
        class=" md:w-8/12 md:mx-1 grid grid-rows-[1fr] h-[86svh] max-h-[86svh] min-h-[86svh] overflow-hidden"
      >

         <div class="m-2 bg-white rounded-xl overflow-hidden">
        <MessageBody
          :selectedPerson="selectedPerson"
          @sendMessage="sendMessage"
          @loadMessagesMobile="loadMessagesMobile"
        />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "mobile",
  // auth:false
});
useHead({
  title: 'Chats',
  meta: [
    { name: "connect", content: 'Student job list' }
  ],
})
</script>
<script>
export default {
  data() {
    return {
      people: [
        {
          id: "person1",
          name: "Boateng Prince",
          avatar:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg",
          time: "2:09 PM",
          messages: [
            { sender: "user", text: "Hey, how are you doing?" },
            { sender: "sender", text: "I'm good, thanks! How about you?" },
            { sender: "sender", text: "Another message from the user." },
          ],
        },
        {
          id: "person2",
          name: "Akoto God is Great",
          avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/dog.png",
          time: "1:44 PM",
          messages: [
            // Add dummy messages for Dog Woofson
            { sender: "user", text: "Yo killa, whatsup" },
            { sender: "sender", text: "Idey boss, waguan" },
            { sender: "user", text: "You hear of ciraq?" },
          ],
        },
        {
          id: "person3",
          name: "Kwamena Bartez",
          avatar:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/louis-ck.jpeg",
          time: "2:09 PM",
          messages: [
            // Add dummy messages for Louis CK
          ],
        },
        {
          id: "person1",
          name: "Boateng Prince",
          avatar:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg",
          time: "2:09 PM",
          messages: [
            { sender: "user", text: "Hey, how are you doing?" },
            { sender: "sender", text: "I'm good, thanks! How about you?" },
            { sender: "sender", text: "Another message from the user." },
          ],
        },
        {
          id: "person2",
          name: "Akoto God is Great",
          avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/dog.png",
          time: "1:44 PM",
          messages: [
            // Add dummy messages for Dog Woofson
            { sender: "user", text: "Yo killa, whatsup" },
            { sender: "sender", text: "Idey boss, waguan" },
            { sender: "user", text: "You hear of ciraq?" },
          ],
        },
        {
          id: "person3",
          name: "Kwamena Bartez",
          avatar:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/louis-ck.jpeg",
          time: "2:09 PM",
          messages: [
            // Add dummy messages for Louis CK
          ],
        },
        {
          id: "person1",
          name: "Boateng Prince",
          avatar:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg",
          time: "2:09 PM",
          messages: [
            { sender: "user", text: "Hey, how are you doing?" },
            { sender: "sender", text: "I'm good, thanks! How about you?" },
            { sender: "sender", text: "Another message from the user." },
          ],
        },
        {
          id: "person2",
          name: "Akoto God is Great",
          avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/dog.png",
          time: "1:44 PM",
          messages: [
            // Add dummy messages for Dog Woofson
            { sender: "user", text: "Yo killa, whatsup" },
            { sender: "sender", text: "Idey boss, waguan" },
            { sender: "user", text: "You hear of ciraq?" },
          ],
        },
        {
          id: "person3",
          name: "Kwamena Bartez",
          avatar:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/louis-ck.jpeg",
          time: "2:09 PM",
          messages: [
            // Add dummy messages for Louis CK
          ],
        },
        {
          id: "person1",
          name: "Boateng Prince",
          avatar:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/thomas.jpg",
          time: "2:09 PM",
          messages: [
            { sender: "user", text: "Hey, how are you doing?" },
            { sender: "sender", text: "I'm good, thanks! How about you?" },
            { sender: "sender", text: "Another message from the user." },
          ],
        },
        {
          id: "person2",
          name: "Akoto God is Great",
          avatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/dog.png",
          time: "1:44 PM",
          messages: [
            // Add dummy messages for Dog Woofson
            { sender: "user", text: "Yo killa, whatsup" },
            { sender: "sender", text: "Idey boss, waguan" },
            { sender: "user", text: "You hear of ciraq?" },
          ],
        },
        {
          id: "person3",
          name: "Kwamena Bartez",
          avatar:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/louis-ck.jpeg",
          time: "2:09 PM",
          messages: [
            // Add dummy messages for Louis CK
          ],
        },
        // Add more people as needed
      ],
      selectedPerson: null,
      isMobile: false,
      showMessageList: true,
    };
  },
  methods: {
    loadMessages(person) {
      this.selectedPerson = person;
      // Toggle between Message List and Message Body on mobile
      if (this.isMobile) {
        this.showMessageList = false;
      }
    },

    loadMessagesMobile() {
      // Toggle between Message List and Message Body on mobile
      if (this.isMobile) {
        this.showMessageList = true;
      }
    },
    sendMessage(text) {
      if (this.selectedPerson) {
        this.selectedPerson.messages.push({ sender: "sender", text });
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth < 768; // Adjust the threshold as needed
      if (!this.isMobile) {
        this.showMessageList = true; // Reset to show message list on larger screens
      }
    },
  },
  mounted() {
    this.isMobile = window.innerWidth < 768; // Adjust the threshold as needed
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>


<style scoped>
.maxWidth {
  max-width: 90%;
  word-wrap: break-word; /* Ensure long words break to the next line */
}
.card2 {
  border-radius: 1rem;
  border: 1px solid #00656570;
  /* max-height: 81vh; */
  overflow-y: hidden;
}

.chatBody {
  height: 60vh;
  overflow-y: auto;
}
.messageList {
  min-height: 74vh;
  max-height: 74vh;
  overflow-y: auto;
  padding-bottom: 20vh;
}

.card {
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  /* height: 100vh; */
}

.top {
  position: relative;
  height: 60px;
  padding: 10px 4px;
  border-bottom: 1px solid #006565;
}

.top:after {
  position: absolute;
  bottom: 0;
  left: 50%;
  display: block;
  width: 80%;
  height: 1px;
  background-color: #e6e6e6;
}

.people {
  margin-left: -1px;
  width: calc(98% + 1px); /* Change this line to set the width to 80% */
}
.people .person {
  position: relative;
  width: 96%;
  padding: 12px 5% 16px;
  cursor: pointer;
  border: 1px solid #e6e6e6;
  border-radius: 1rem;
  margin: 5px;
}

.people .person:after {
  position: absolute;
  bottom: 0;
  left: 50%;
  display: block;
  height: 1px;
}

.people .person img {
  float: left;
  width: 50px;
  height: 50px;
  margin-right: 12px;
  border-radius: 50%;
  object-fit: cover;
}

.people .person .name {
  line-height: 24px;
}

.people .person .time {
  font-size: 14px;
  position: absolute;
  top: 16px;
  right: 10%;
  padding: 0 0 5px 5px;
}

.people .person .preview {
  font-size: 14px;
  display: inline-block;
  overflow: hidden !important;
  width: 70%;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.people .person.active,
.people .person:hover {
  border: 0;
  background-color: #e6e6e6;
}

.people .person:hover {
  background-color: #d1e7e7;
}

/* RIGHT SIDE */
</style>

