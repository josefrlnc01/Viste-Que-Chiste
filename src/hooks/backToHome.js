import { Capacitor } from "@capacitor/core";
import {App} from "@capacitor/app"
import { useEffect, useRef } from "react";
import {useLocation, useNavigate} from "react-router-dom"

export function useBackToHome({
    homePath = '/',
    doublePressToExit = true,
    onSecondPress,
    shouldCloseOverlay

} = {}) {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const lastPress = useRef(0)

    useEffect(() => {
        if (!Capacitor.isNativePlatform()) return
        const sub = App.addListener('backButton', () => {
            //Si hay modal abierta se cierra y se consume el back
            if(shouldCloseOverlay && shouldCloseOverlay()) return

            const onHome = pathname === homePath

            //Si no estoy en home, voy a home
            if(!onHome){
                navigate(homePath, {replace : true})
                return
            }

            //Si estoy en home doble pulsación para salir

            if(doublePressToExit){
                const now = Date.now()
                if(now - lastPress.current < 1200){
                    App.exitApp()
                } else {
                    lastPress.current = now
                    onSecondPress?.()
                }
            }
            else{
                App.exitApp()
            }
        })
        return () => {
            if (Capacitor.isNativePlatform()) {
                sub.remove()
            }
        }
    }, [pathname, homePath, navigate, doublePressToExit, onSecondPress, shouldCloseOverlay])
}