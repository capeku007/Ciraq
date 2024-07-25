<template>
  <div     class="mx-auto max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl grid grid-rows-[1fr] h-[85svh] max-h-[85svh] min-h-[85svh] overflow-hidden"
>
    <div class=" md:flex no-wrap md:-mx-1">
      <!-- Messages List (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && showMessageList)"
        class=" rounded-xl w-full md:w-4/12 md:mx-1 grid grid-rows-[[7svh]_1fr] h-[85svh] max-h-[85svh] min-h-[85svh] bg-white m-2 "
      >
<div class="m-2 flex justify-between items-center">
      <div class="left">
        <h5 class="text-base sm:text-lg px-4">Messages</h5>
      </div>
      <div class="right flex space-x-4 mr-4">
        <i class='text-xl bx bx-message-dots' :class="{ 'active': activeList === 'messages' }" @click="setActiveList('messages')"></i>
        <i class='text-xl bx bx-user-voice' :class="{ 'active': activeList === 'friends' }" @click="setActiveList('friends')"></i>
        <i class='text-xl bx bx-group' :class="{ 'active': activeList === 'requests' }" @click="setActiveList('requests')"></i>
      </div>
    </div>

    <ul v-if="activeList === 'messages'" class="people h-77svh] max-h-[77svh] min-h-[77svh] overflow-y-auto my-auto pb-[10vh]">
      <li class="person" v-for="person in people" :key="person.user_id" @click="loadMessages(person)">
        <img   :src="person.profile_img ? `https://ciraq.co/api/public/uploads/profile_images/${person.profile_img}` : profilePlaceholder"
  :alt="`${person.fname} ${person.lname}'s profile image`" />
        <span class="name text-lime-950 text-text-lg font-medium">{{ person.friend_name }}</span>
        <span class="time text-gray-600"></span>
        <span class="preview">
  {{ person.institution_name}}
</span>
      </li>
    </ul>

    <ul v-if="activeList === 'friends'" class="people h-77svh] max-h-[77svh] min-h-[77svh] overflow-y-auto my-auto pb-[10vh]">
      <li class="person" v-for="friend in friends" :key="friend.id" @click="loadMessages(friend)">
        <img :src="friend.avatar" alt="" />
        <span class="name text-lime-950 text-text-lg font-medium">{{ friend.name }}</span>
        <span class="time text-gray-600">{{ friend.time }}</span>
        <span class="preview">
          {{ friend.messages.length > 0 ? friend.messages[friend.messages.length - 1].text : "" }}
        </span>
      </li>
    </ul>

    <ul v-if="activeList === 'requests'" class="people h-77svh] max-h-[77svh] min-h-[77svh] overflow-y-auto my-auto pb-[10vh]">
      <li class="person" v-for="request in requests" :key="request.id" @click="loadMessages(request)">
        <img :src="request.avatar" alt="" />
        <span class="name text-lime-950 text-text-lg font-medium">{{ request.name }}</span>
        <span class="time text-gray-600">{{ request.time }}</span>
        <span class="preview">
          {{ request.messages.length > 0 ? request.messages[request.messages.length - 1].text : "" }}
        </span>
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { io } from 'socket.io-client';
import { useAuthStore } from "../stores/authStore";
import profilePlaceholder from '~/assets/images/profilePlace.jpg';

import { useMainStore } from "~/stores/main";

const mainStore = useMainStore();
definePageMeta({
  layout: "mobile",
  middleware: ["unauthstd"],
});

useHead({
  title: 'Chats',
  meta: [
    { name: "connect", content: 'Student job list' }
  ],
})

const activeList = ref('messages')
const people = ref([])
const friends = ref([]) 
const requests = ref([])
const socket = ref(null);
const authStore = useAuthStore();

const selectedPerson = ref(null)
const isMobile = ref(false)
const showMessageList = ref(true)

const setActiveList = (list) => {
  activeList.value = list
}

const logit = () => {
  console.log("🚀 ~ logit ~ people", socket.value, authStore.token);
};

const loadMessages = (person) => {
  console.log("person", person)
  selectedPerson.value = person;
  if (isMobile.value) {
    showMessageList.value = false;
  }
  socket.value.emit('joinChat', {friendship_id: person.friendship_id, name: person.friend_name, sender: authStore.token});
};

const fetchUsers = async () => {
  try {
    const res = await fetch(
      mainStore.urlbase + 'chats/friends', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authStore.token,
      } 
    });
    console.log("🚀 ~ fetchUsers ~ authStore.token:", authStore.token);

    let data = await res.json();
    people.value = data.data;
    console.log("🚀 ~ fetchUsers ~ people:", people.value);
  } catch (error) {
    console.log(error);
  }
};

const loadMessagesMobile = () => {
  if (isMobile.value) {
    showMessageList.value = true;
  }
};

const sendMessage = (text) => {
  if (selectedPerson.value) {
    selectedPerson.value.messages.push({ sender: "sender", text });
  }
};

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
  if (!isMobile.value) {
    showMessageList.value = true
  }
}


onMounted(() => {
  isMobile.value = window.innerWidth < 768;
  window.addEventListener("resize", handleResize);
  fetchUsers();

  if(authStore.token){
    socket.value = io(
      mainStore.urlbase + 'chat', {
      auth: {
        token: authStore.token
      }
    });
  } else {
    console.log("No token found can't connect to socket");
  }

  socket.value.on('chatMessage', (message) => {
    console.log('Connected to /chat namespace');
    console.log('message', message);
  });

  socket.value.on('joinError', (error) => {
    console.log('Error joining chat:', error);
  });

  
  socket.value.on('joinChat', (msg) => {
    console.log( msg);
  });


  socket.value.on('connect_error', (error) => {
    console.log('Connection error:', error);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>


<style scoped>
.active {
  color: #007bff;
}
i {
  cursor: pointer;
}

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

