import { View, Text, ScrollView,Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'
import { signIn } from '../../lib/appwrite'
import { router } from 'expo-router'


const signin = () => {
  const [form,setForm] = useState({
    email:'',
    password:''
  })
  const [isSubitting,setisSubmitting] = useState(false)
  const formSubmit = async ()=>{
    if(!form.email || !form.password){
      Alert.alert('Error','Please fill in all fields!')
    }
    setisSubmitting(true)
        try {
          await signIn(form.email,form.password)

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
              <Text className='text-2xl text-white text-semibold mt-10 font-semibold'>Login to Aora</Text>
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
               title='Sign In'
               handlePress={formSubmit}
               containerStyles='mt-10'
               isLoading={isSubitting}
               />
               <View className='justify-center pt-5 flex-row gap-2'>
                    <Text className='text-sm text-gray-100 font-pregular'>Don't have an account?</Text>
                    <Link href='sign-up' className='text-sm font-psemibold text-secondary underline'>sign-up</Link>
               </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default signin