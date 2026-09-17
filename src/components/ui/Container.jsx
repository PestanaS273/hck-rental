export default function Container({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`safe-x mx-auto w-full max-w-page sm:px-6 ${className}`} {...props}>
      {children}
    </Tag>
  )
}
