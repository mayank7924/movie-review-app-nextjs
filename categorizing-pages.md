Types of pages:

- SSG (Statically generated) - generated as static HTML pages during build, uses getStaticProps method to fetch data during build time, fast loading and better SEO

- CSR (Client-side rendered) - the contents of the HTML page are dynamically hydrated on the browser, where dynamic data is being stored as React state or passed as props, data is fetched on the client side

- SSR (Server-side rendered) - HTML content for the page is generated on every single request on the server and then sent back as a response, defines a getServerSideProps method to fetch data for each request, slow rendering but best option for showing real time data 

- ISR (Incremental-static regeneration) - allows you to regenerate and cache a new version of your static pages while your app is running on a live production server with newly fetched data 


Pages in Movie Review App:

  Route                             Page Type 
- / (Homepage)                      SSG with no data fetching
- /auth (Login/SignUp)              SSG/CSR
- /movies (List movies)             SSR/ISR
- /movie/:id (Details of a movie)   SSR/CSR
- /profile (User profile)           SSG/CSR