import { Account,Avatars,Client,Databases,ID, Query } from 'react-native-appwrite';

export const Config={
    endpoint:'https://cloud.appwrite.io/v1',
    platform:'com.likhith.aora_app',
    projectId:'66a63ebf00396f4cf7ae',
    databaseId:'66a640b7002bcb404816',
    userCollectionId:'66a640f600099acee5da',
    videoCollectionId:'66a64131000ac009afdc',
    storageId:'66a643a300347eb258cc'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(Config.endpoint) // Your Appwrite Endpoint
    .setProject(Config.projectId) // Your project ID
    .setPlatform(Config.platform) // Your application ID or bundle ID.
;


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)



export const  createUser = async (email,password,username)=>{
    // Register User
    try {
        const newAccount= await account.create(ID.unique(),email,password,username)
        if(!newAccount) throw new Error

        const avatarUrl = avatars.getInitials(username)
        await signIn(email,password)
        const newUser = databases.createDocument(
            Config.databaseId,
            Config.userCollectionId,
            ID.unique(),
            {
                accountid:newAccount.$id,
                email,
                password,
                username,
                avatar:avatarUrl
            }
        )
        console.log('new user---',newUser)
        return newUser

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signIn= async(email,password)=>{
    try {
        const session = await account.createEmailPasswordSession(email,password)
        return session
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}


export const getCurrentUser=async()=>{
    try {
        const currentAccount = await account.get()

        if(!currentAccount) throw Error
        const currentUser = await databases.listDocuments(
            Config.databaseId,
            Config.userCollectionId,
            [Query.equal('accountid',currentAccount.$id)]
        )
        if(!currentUser) throw Error

        return currentUser.documents[0]
        
    } catch (error) {
        console.log(error)
    }
}

