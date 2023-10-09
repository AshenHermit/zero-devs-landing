import { EventHandler } from "event-js"
import React, { useEffect, useRef, useState } from "react"

export class Client{
    constructor(){
        this.sectionsData = []
        this.sectionsDataListeners = []
        this.onSectionDataChanged = new EventHandler()
        this.currentSectionData = null
    }
    getSectionData(id){
        return this.sectionsData.filter(x=>x.id == id)[0]
    }
}

export const ClientContext = React.createContext(new Client())

export const ClientWrapper = ({children, ...props}) => {
    const client = useRef(new Client())
    var [currentSectionData, setCurrentSectionData] = useState({})

    const updateSectionData = ()=>{
        const sectionId = window.location.hash.substring(1)
        if(!sectionId) return
        if(currentSectionData){
            if(currentSectionData.id == sectionId) return
        }
        let data = client.current.getSectionData(sectionId)
        
        client.current.currentSectionData = data
        setCurrentSectionData(data)
        client.current.onSectionDataChanged.publish(data)
    }

    useEffect(() => {
        document.addEventListener('scroll', updateSectionData);
        updateSectionData()
        return () => {
            document.removeEventListener('scroll', updateSectionData);
        };
    })

    return <ClientContext.Provider value={client.current}>
        {children}
    </ClientContext.Provider>
}
