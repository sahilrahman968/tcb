import React, { useEffect, useState } from 'react'
import search from "../../assets/search.jpeg"
import styles from "../../styles/SearchInput.module.scss"
import Image from 'next/image';

// type SearchInputProps={
//     placeholder:any,
//     onSearch:any,
//     searchIcon?:boolean,
//     value?:string,
//     type?:string,
//     maxCharacter?:any,
//     height?:any,
//     step?:any,
//     fontsize?:any
// }

function SearchInputV2(props) {
  const {placeholder,onSearch,searchIcon,value:valueFromParent,type,maxCharacter=null,height,step,fontsize} = props;
  const [value , setValue] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') { 
      onSearch(value);
    }
    else if(event.key === 'Backspace' && value?.length > 10){
        setValue(value?.slice(0, -1))
    }
  }

  useEffect(()=>{
    setValue(valueFromParent||"")
  },[valueFromParent])

  return (
    <div className={styles.input_container}>
        <input className={styles.input} placeholder={placeholder} 
          onChange={(e)=>{
            if(maxCharacter){
              if(e.target.value.length <= maxCharacter){
                setValue(e.target.value)
                if(!searchIcon)onSearch(e.target.value);
              }
            }else{
              setValue(e.target.value)
              if(!searchIcon)onSearch(e.target.value);
            }
          }} 
          value={value} 
          onKeyDown={handleKeyDown}
          type={type ? type : "text"}
          style={{fontSize: fontsize ? fontsize:"",height: height?height:"", borderBottomColor:value?"green":"red"}}
        />
        {
          searchIcon ? 
          <span className={styles.search_button} onClick={()=>{onSearch(value)}}>
            <Image src={search} alt="search"/>
          </span> : ""
        }
    </div>
  )
}

export default SearchInputV2