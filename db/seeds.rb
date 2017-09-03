User.destroy_all
Chatroom.destroy_all
ChatroomSubscription.destroy_all
Message.destroy_all

puts 'start seed...'

User.create email: 'romain@test.com', password: '123456', username: 'romain'
User.create email: 'ugo@test.com', password: '123456', username: 'ugo'
User.create email: 'raphael@test.com', password: '123456', username: 'raphael'
User.create email: 'benjamin@test.com', password: '123456', username: 'benjamin'
User.create email: 'robin@test.com', password: '123456', username: 'robin'
User.create email: 'alex@test.com', password: '123456', username: 'alex'
User.create email: 'louis@test.com', password: '123456', username: 'louis'
User.create email: 'albane@test.com', password: '123456', username: 'albane'
User.create email: 'charlotte@test.com', password: '123456', username: 'charlotte'
User.create email: 'arthur@test.com', password: '123456', username: 'arthur'
puts '10 users created'

Chatroom.create name: 'Chatroom Test 1', description: Faker::Lorem.sentence(7), creator_id: 1
Chatroom.create name: 'Chatroom Test 2', description: Faker::Lorem.sentence(7), creator_id: 1
Chatroom.create name: 'Chatroom Test 3', description: Faker::Lorem.sentence(7), creator_id: 1
Chatroom.create name: 'Chatroom Test 4', description: Faker::Lorem.sentence(7), creator_id: 2
Chatroom.create name: 'Chatroom Test 5', description: Faker::Lorem.sentence(7), creator_id: 2
Chatroom.create name: 'Chatroom Test 6', description: Faker::Lorem.sentence(7), creator_id: 3
Chatroom.create name: 'Chatroom Test 7', description: Faker::Lorem.sentence(7), creator_id: 4
Chatroom.create name: 'Chatroom Test 8', description: Faker::Lorem.sentence(7), creator_id: 5
Chatroom.create name: 'Chatroom Test 9', description: Faker::Lorem.sentence(7), creator_id: 6
Chatroom.create name: 'Chatroom Test 10', description: Faker::Lorem.sentence(7), creator_id: 7
puts '10 chatrooms created'

Chatroom.all.each do |chatroom|
  ChatroomSubscription.create user_id: chatroom.creator_id, chatroom_id: chatroom.id
  id = 1
  (1..9).to_a.sample.times do
    ChatroomSubscription.create user_id: id, chatroom_id: chatroom.id if not chatroom.members.include?(User.find(id))
    id += 1
  end
end
puts 'random number of chatroom subscriptions created fo each chatroom'

puts '...end seed'
