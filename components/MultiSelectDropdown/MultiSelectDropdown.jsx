import React, { useEffect, useRef, useState } from 'react'
import styles from "../../styles/MultiSelectDropdown.module.scss";
// import downArrow from "../../assets/down_arrow.jpeg"
import downArrow from "../../assets/down_arrow.jpeg"
import useOutsideElementAlerter from '../../hooks/useOutsideElementAlerter'
import close from "../../assets/close.jpeg"
import Image from 'next/image';

// type MultiSelectDropdownProp = {
//   title:any,
//   options:any,
//   id?:any,
//   onChange?:any,
//   selectedOptions:any,
//   disabled?:any,
//   selectionType?:string,
//   onSelect?: any,
//   height?:any,
//   setDropdownOpen?:any,
//   fontsize?:any
//   selectStyle?:any,
//   // height?:any
// }

function MultiSelectDropdown(props) {
  const { title, options=[], id, onChange, selectedOptions=[], disabled,onSelect,selectStyle,height } = props
  const [showOptions , setShowOptions] = useState(false);
  const [optionSelected , setOptionsSelected] = useState([...selectedOptions]);
  const wrapperRef = useRef(null);
  useOutsideElementAlerter(wrapperRef, setShowOptions);
  
  useEffect(()=>{setOptionsSelected([...selectedOptions])},[selectedOptions])

  const onChnageHandler = (option) => {
      let clone = JSON.parse(JSON.stringify(optionSelected));

      let index = clone.findIndex((op)=>{
        return op.id === option.id 
      })

      if(index > -1){
        clone.splice(index,1)
      }
      else{
        clone.push(option);
      }

      if(props.selectionType === "single")
        onChange(clone);
      else{
        setOptionsSelected(clone);
        onSelect(clone)
      }  
  }

  const selectAllHandler = () => {
    if(optionSelected?.length < options?.length){
      setOptionsSelected([...options])
      onSelect([...options])
    }
    else{
      setOptionsSelected([])
      onSelect([])
    }
  }

  useEffect(()=>{
    if(props?.setDropdownOpen){
      props?.setDropdownOpen(showOptions)
    }
  },[showOptions])
  return (
    <div ref={wrapperRef} className={styles.dropdown_container} style={{...selectStyle, cursor:disabled?"not-allowed":""}}>
      <div id={id} className={styles.dropdown_container_body} onClick={()=>{if(disabled || showOptions || options.length === 0) return; setShowOptions(true)}} style={{height:height || "",borderBottomColor:selectedOptions?.[0]?.title ? "green":"red"}}>
        {selectedOptions.length ? <div className={styles.selceted_options_container}>
        {
            props.selectionType === "single" ?
            <div style={{fontSize:props?.fontsize?props?.fontsize:""}} className={styles.selceted_option}>{selectedOptions?.[0]?.title}</div>:
            <>
            {
              optionSelected?.map((option)=>{
                  return <div className={styles.selceted_options} key={option.id}>{option.title?.[0]}{option.title?.[1]}{option.title?.[2]}{option.title?.[3]}...<img onClick={()=>{onChnageHandler(option)}} className={styles.close_icon} src={close} alt="close"/></div>
              })
            }
            </>
        }
        </div> : 
        <span className={styles.body_title} style={{fontSize:props?.fontsize?props?.fontsize:""}}>{title}</span>}
        <Image 
          // onClick={()=>{if(disabled) return; setShowOptions(true)}} 
          className={styles.body_down_arrow} 
          src={downArrow} 
          alt="down-arrow"
          style={{transform:showOptions ? "rotate(180deg)" : ""}}
        />
      </div>
      {
        (showOptions && options?.length) ? <div className={styles.drop_down}>
          {
              props.selectionType !== "single" &&  options?.length > 0 &&  <div className={styles.drop_down_option} onClick={selectAllHandler}>
                <input type="checkbox" checked={optionSelected?.length === options?.length}/>
                Select All
              </div>
          }
          {
            ([...options])?.map((option,index)=>{
              return <div className={styles.drop_down_option} key={option?.id} onClick={()=>{if(props.selectionType !== "single")return; props?.onSelect(option);setShowOptions(false)}}>
                <div>{props.selectionType !== "single" && <input type="checkbox" checked={optionSelected.findIndex((op)=>{return option.id === op.id})>-1} value={option?.title} onChange={(e)=>{onChnageHandler(option)}}/>}</div>
                <span>{option?.display ? option?.display : option?.title}</span>
              </div>
            })
          }
        </div>:<></>
      }
    </div>
  )
}

export default MultiSelectDropdown