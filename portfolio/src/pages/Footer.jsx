import React from 'react'
import {Link} from 'react-router-dom'
function Footer() {
  return (
    <>

<footer class="border-t border-gray-200 dark:border-gray-700 p-4 md:p-8 lg:p-10">
  <div class="max-w-screen-xl mx-auto">
    <div class="flex flex-col sm:flex-row justify-between items-center">
      <Link to="/" class="flex items-center mb-6 sm:mb-0 space-x-3 rtl:space-x-reverse">
        <img src="https://i.ytimg.com/vi/WoVSC5rbsCA/sddefault.jpg" class="h-8" alt="Akhil Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Akhil</span>
      </Link>

      <ul class="flex flex-wrap justify-center sm:justify-start items-center text-sm text-gray-500 dark:text-gray-400">
        <li>
          <a href="#" class="hover:underline mr-4 md:mr-6">About</a>
        </li>
        <li>
          <a href="#" class="hover:underline mr-4 md:mr-6">Privacy Policy</a>
        </li>
        <li>
          <a href="#" class="hover:underline mr-4 md:mr-6">Licensing</a>
        </li>
        <li>
          <a href="#" class="hover:underline">Contact</a>
        </li>
      </ul>
    </div>

    <hr class="my-6 border-gray-200 dark:border-gray-700" />

    <div class="flex flex-col sm:flex-row justify-between items-center text-center">
      <span class="text-sm text-gray-500 dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
    </div>
  </div>
</footer>


    </>
  )
}

export default Footer