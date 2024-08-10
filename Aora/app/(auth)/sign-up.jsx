import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'


const signup = () => {
  const [form,setForm] = useState({
    email:'',
    username:'',
    password:''
  })
  const [isSubitting,setisSubmitting] = useState(false)
  const formSubmit =async ()=>{
    if(!form.email || !form.password || !form.username){
      Alert.alert('Error','Please fill in all fields!')
    }
    setisSubmitting(true)
        try {
          const result = await createUser(form.email,form.password,form.username)

          router.replace('/home')
        } catch (error) {
          console.log(error)
          Alert.alert('Error',error.message)
          
        }
        finally{
          setisSubmitting(false)
        }
  }
  return (
    <SafeAreaView className='h-full bg-primary'>
        <ScrollView>
          <View className='w-full justify-center min-h-[85vh] px-6 my-6'>
              <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'/>
              <Text className='text-2xl text-white text-semibold mt-10 font-semibold'>Signup to Aora</Text>
              <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e)=> setForm({...form,username:e})}
              otherStyles="mt-7 "
              />
              <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e)=> setForm({...form,email:e})}
              otherStyles="mt-7 "
              keyboardType="email-address"/>
              <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e)=> setForm({...form,password:e})}
              otherStyles="mt-7 "
              />
               <CustomButton
               title='Sign Up'
               handlePress={formSubmit}
               containerStyles='mt-10'
               isLoading={isSubitting}
               />
               <View className='justify-center pt-5 flex-row gap-2'>
                    <Text className='text-sm text-gray-100 font-pregular'>Have an account already?</Text>
                    <Link href='sign-in' className='text-sm font-psemibold text-secondary underline'>Login</Link>
               </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default signup