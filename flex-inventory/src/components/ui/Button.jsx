export default function Button({ className='', variant='primary', ...props }){
  return <button className={`btn ${variant} ${className}`} {...props} />
}
