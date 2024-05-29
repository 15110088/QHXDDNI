#include <jni.h>
#include <string>

extern "C" {

    JNIEXPORT jstring JNICALL
    Java_com_qldt_customNative_MapModule_invokeNativeFunction(JNIEnv *env, jobject object) {
        std::string api_key = "hguZ1vs1217Yz1j3";
        return env->NewStringUTF(api_key.c_str());
    }

    JNIEXPORT jstring JNICALL
    Java_com_qldt_customNative_MapActivity_invokeNativeFunction(JNIEnv *env, jobject object) {
        std::string api_key = "Conlaumoikhai20@22";
        return env->NewStringUTF(api_key.c_str());
    }


}