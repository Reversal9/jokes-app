import streamlit as st
import requests
from datetime import datetime

st.write("Hello World!")

if st.button("Get Joke", type="primary", key="joke"):
    start = datetime.now()

    data = requests.get("http://backend:3000/joke").json()

    if "joke" in data.get("body"):
        st.write(data.get("body").get("joke"))
    else:
        st.write(data.get("body").get("setup"))
        st.write(data.get("body").get("delivery"))

    end = datetime.now()
    st.write(end-start)

st.write("History")

if st.button("Get Log", type="primary", key="log"):
    start = datetime.now()

    data = requests.get("http://backend:3000/log").json()
    st.write(data)

    end = datetime.now()
    st.write(end-start)
