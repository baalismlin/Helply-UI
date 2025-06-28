import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'

function TaskDetail() {
  const { id } = useParams()
  const { t } = useTranslation()
  const { user } = useAuth()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookmarked, setBookmarked] = useState(false)
  const [providerBookmarked, setProviderBookmarked] = useState(false)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState('')
  const [rating, setRating] = useState(5)

  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchTaskDetails = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock task data
        const mockTask = {
          id: parseInt(id),
          title: 'Professional Photography',
          description:
            'High-quality photos for your events. I specialize in event photography, portraits, and product photography. With over 5 years of experience, I can help capture your special moments with professional equipment and editing.',
          price: 50,
          category: 'photography',
          city: 'New York',
          provider: 'John Doe',
          providerId: 'user123',
          providerRating: 4.8,
          providerReviews: 24,
          images: [
            'https://via.placeholder.com/800x600',
            'https://via.placeholder.com/800x600',
            'https://via.placeholder.com/800x600',
          ],
          createdAt: '2023-05-15',
        }

        // Mock reviews
        const mockReviews = [
          {
            id: 1,
            userId: 'user456',
            userName: 'Jane Smith',
            rating: 5,
            comment:
              'Excellent task! John was professional and delivered the photos quickly.',
            createdAt: '2023-06-10',
          },
          {
            id: 2,
            userId: 'user789',
            userName: 'Mike Johnson',
            rating: 4,
            comment:
              'Good quality photos, but took a bit longer than expected to deliver.',
            createdAt: '2023-06-05',
          },
        ]

        setTask(mockTask)
        setReviews(mockReviews)
      } catch (error) {
        console.error('Error fetching task details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTaskDetails()
  }, [id])

  const handleBookmarkTask = () => {
    setBookmarked(!bookmarked)
    // In a real app, you would call an API to save the bookmark
  }

  const handleBookmarkProvider = () => {
    setProviderBookmarked(!providerBookmarked)
    // In a real app, you would call an API to save the bookmark
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()

    if (!newReview.trim()) return

    // In a real app, you would call an API to save the review
    const newReviewObj = {
      id: Date.now(),
      userId: user?.id || 'currentUser',
      userName: user?.name || 'You',
      rating,
      comment: newReview,
      createdAt: new Date().toISOString().split('T')[0],
    }

    setReviews([newReviewObj, ...reviews])
    setNewReview('')
    setRating(5)
  }

  const handleOpenChat = () => {
    // This would open the chat with the provider
    // We'll implement this later
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-10 text-gray-500">
          {t('task_not_found')}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="flex text-sm text-gray-500">
          <li className="mr-2">
            <Link to="/dashboard" className="hover:text-blue-600">
              {t('marketplace')}
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li className="mr-2">
            <Link
              to={`/dashboard?category=${task.category}`}
              className="hover:text-blue-600"
            >
              {t(task.category)}
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li className="font-medium text-gray-900">{task.title}</li>
        </ol>
      </nav>

      {/* Task details */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Image gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="md:col-span-2">
            <img
              src={task.images[0]}
              alt={task.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          {task.images.slice(1).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${task.title} ${index + 2}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
        </div>

        {/* Task info */}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
            <button
              onClick={handleBookmarkTask}
              className={`p-2 rounded-full ${
                bookmarked
                  ? 'text-yellow-500'
                  : 'text-gray-400 hover:text-gray-500'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill={bookmarked ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>

          <div className="mt-2 flex items-center">
            <span className="text-blue-600 text-2xl font-bold">
              ${task.price}
            </span>
            <span className="ml-4 px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
              {task.city}
            </span>
            <span className="ml-4 text-sm text-gray-500">
              {t('posted_on')} {task.createdAt}
            </span>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">
              {t('description')}
            </h2>
            <p className="mt-2 text-gray-600">{task.description}</p>
          </div>

          {/* Provider info */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  {task.provider.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {task.provider}
                  </h3>
                  <div className="flex items-center">
                    <div className="flex items-center"></div>
                    <button
                      onClick={handleOpenChat}
                      className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      {t('contact_provider')}
                    </button>
                  </div>
                </div>
              </div>

              {/* Reviews section */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h2 className="text-lg font-medium text-gray-900">
                  {t('reviews_and_comments')}
                </h2>

                {/* Review form */}
                <form onSubmit={handleSubmitReview} className="mt-4">
                  <div className="flex items-center mb-2">
                    <span className="mr-2">{t('your_rating')}:</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <svg
                            className={`h-5 w-5 ${
                              star <= rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex">
                    <textarea
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      placeholder={t('write_a_review')}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      rows="2"
                      required
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                    >
                      {t('post')}
                    </button>
                  </div>
                </form>

                {/* Reviews list */}
                <div className="mt-6 space-y-6">
                  {reviews.length === 0 ? (
                    <p className="text-gray-500">{t('no_reviews_yet')}</p>
                  ) : (
                    reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-6"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                              {review.userName.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                {review.userName}
                              </p>
                              <div className="flex items-center mt-1">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? 'text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">
                            {review.createdAt}
                          </p>
                        </div>
                        <p className="mt-2 text-gray-600">{review.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetail
