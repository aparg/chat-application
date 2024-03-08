import pandas as pd
import re
import pickle

def train_bayes_model():
    message_spam = pd.read_csv('SMSSpamCollection', sep='\t',header=None, names=['Label', 'Message'])
    print(message_spam.shape)
    message_spam.head()

    message_spam['Label'].value_counts(normalize=True)

    # Randomize the dataset
    randomized_data = message_spam.sample(frac=1, random_state=95)

    # Calculate index for split
    training_test_index = round(len(randomized_data) * 0.8)

    # Split into training and test sets
    training_set = randomized_data[:training_test_index].reset_index(drop=True)
    test_set = randomized_data[training_test_index:].reset_index(drop=True)

    print(training_set.shape)
    print(test_set.shape)

    training_set['Label'].value_counts(normalize=True)

    test_set['Label'].value_counts(normalize=True)




    #before cleaning
    training_set.head(3)




    # After cleaning
    training_set['Message'] = training_set['Message'].str.replace('\W', ' ') # Removes punctuation
    training_set['Message'] = training_set['Message'].str.lower()
    training_set.head(3)




    #create the vocabulary
    training_set['Message'] = training_set['Message'].str.split()




    vocabulary = []
    for message in training_set['Message']:
        for word in message:
            vocabulary.append(word)

    vocabulary = list(set(vocabulary))

    len(vocabulary)





    #creating the transformation table(dictionary)
    word_counts_per_message = {unique_word: [0] * len(training_set['Message']) for unique_word in vocabulary}

    for index, message in enumerate(training_set['Message']):
        for word in message:
            word_counts_per_message[word][index] += 1





    #final transformation table
    word_counts = pd.DataFrame(word_counts_per_message)
    word_counts.head()




    #having the Label and Message columns
    training_set_clean = pd.concat([training_set, word_counts], axis=1)
    training_set_clean.head()





    # Isolating spam and ham messages first
    spam_messages = training_set_clean[training_set_clean['Label'] == 'spam']
    ham_messages = training_set_clean[training_set_clean['Label'] == 'ham']

    # P(Spam) and P(Ham)
    p_spam = len(spam_messages) / len(training_set_clean)
    p_ham = len(ham_messages) / len(training_set_clean)

    # N_Spam
    n_words_per_spam_message = spam_messages['Message'].apply(len)
    n_spam = n_words_per_spam_message.sum()

    # N_Ham
    n_words_per_ham_message = ham_messages['Message'].apply(len)
    n_ham = n_words_per_ham_message.sum()

    # N_Vocabulary
    n_vocabulary = len(vocabulary)

    # Laplace smoothing
    alpha = 1






    # Initiate parameters
    parameters_spam = {unique_word:0 for unique_word in vocabulary}
    parameters_ham = {unique_word:0 for unique_word in vocabulary}

    # Calculate parameters
    for word in vocabulary:
        n_word_given_spam = spam_messages[word].sum() # spam_messages already defined
        p_word_given_spam = (n_word_given_spam + alpha) / (n_spam + alpha*n_vocabulary)
        parameters_spam[word] = p_word_given_spam

        n_word_given_ham = ham_messages[word].sum() # ham_messages already defined
        p_word_given_ham = (n_word_given_ham + alpha) / (n_ham + alpha*n_vocabulary)
        parameters_ham[word] = p_word_given_ham

    # Initiate parameters
    parameters_spam = {unique_word:0 for unique_word in vocabulary}
    parameters_ham = {unique_word:0 for unique_word in vocabulary}

    # Calculate parameters
    for word in vocabulary:
        n_word_given_spam = spam_messages[word].sum() # spam_messages already defined
        p_word_given_spam = (n_word_given_spam + alpha) / (n_spam + alpha*n_vocabulary)
        parameters_spam[word] = p_word_given_spam

        n_word_given_ham = ham_messages[word].sum() # ham_messages already defined
        p_word_given_ham = (n_word_given_ham + alpha) / (n_ham + alpha*n_vocabulary)
        parameters_ham[word] = p_word_given_ham
    
        # Save parameters and models
    with open('model_9_parameters.pkl', 'wb') as f:
        pickle.dump((p_spam, p_ham, vocabulary, parameters_spam, parameters_ham), f)
        
def classify9(message):
    # Load parameters and models
    with open('model_9_parameters.pkl', 'rb') as f:
        p_spam, p_ham, vocabulary, parameters_spam, parameters_ham = pickle.load(f)

    # Classify the message
    message = re.sub('\W', ' ', message)
    message = message.lower().split()
    p_spam_given_message = p_spam
    p_ham_given_message = p_ham

    for word in message:
        if word in parameters_spam:
            p_spam_given_message *= parameters_spam[word]

        if word in parameters_ham:
            p_ham_given_message *= parameters_ham[word]

    if p_ham_given_message > p_spam_given_message:
        return False
    elif p_spam_given_message > p_ham_given_message:
        return True

if __name__ == "__main__":
    train_bayes_model()
    classify9("testing")




    
    