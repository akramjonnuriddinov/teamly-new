import { firebaseApp } from '@/firebase/index'
import { collection, addDoc, getFirestore } from 'firebase/firestore'


const firestore = getFirestore(firebaseApp);


export const sendMailMessage = async (email:any, id: any) => {
  try {
    const mailCollection = collection(firestore, 'mail');
    const currentDate = new Date();
    const dateTime = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
      hours: currentDate.getHours(),
      minutes: currentDate.getMinutes(),
      seconds: currentDate.getSeconds()
    };

    const verifyLink = `${window.location.origin}/verify?id=${id}`;
    const data = {
      to: email,
      message: {
        subject: 'Verify your email for Teamly.uz',
        html: `
          <h1>Hello,</h1>
          <p>We received a request to sign in to Teamly.uz using this email address, at ${dateTime.year}-${dateTime.month}-${dateTime.day} ${dateTime.hours}:${dateTime.minutes}:${dateTime.seconds}. If you want to sign in with your ${email} account, click this <br> <a href="${verifyLink}">link</a>.</p>
          <img src="https://media.licdn.com/dms/image/D4D3DAQEOUK939l3CAA/image-scale_191_1128/0/1693891453607/teamly_uz_cover?e=2147483647&v=beta&t=rm4pmArgwdoeuCen8YkujxA4-jSMtqJI9UvJEVAjRDA" alt="Teamly Logo" style="display:block; width: 200px; height: auto;">
        `
      }
    };

    await addDoc(mailCollection, data);
    console.log('Queued email for delivery!');
  } catch (error) {
    console.error('Error adding data to Firestore: ', error);
  }
};
